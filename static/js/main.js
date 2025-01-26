/*
词云生成器核心逻辑
作者：liqian_liukaining
日期：2025年1月26日
*/

class WordCloudGenerator {
    constructor() {
        this.cloudInstance = null; // 词云实例
        this.isValid = false; // 当前词云是否有效
        this.initEventListeners(); // 初始化事件监听
        this.initSizeControls(); // 初始化尺寸控制
        this.initLoadingAnimation(); // 初始化加载动画
    }

    /**
     * 初始化事件监听
     */
    initEventListeners() {
        document.getElementById('generateBtn').addEventListener('click', () => this.generate());
        document.getElementById('downloadBtn').addEventListener('click', () => this.download());
        window.addEventListener('resize', () => this.handleResize());
    }

    /**
     * 初始化尺寸控制
     */
    initSizeControls() {
        const widthInput = document.getElementById('widthInput');
        const heightInput = document.getElementById('heightInput');

        [widthInput, heightInput].forEach(input => {
            input.addEventListener('change', () => {
                if (this.cloudInstance) {
                    this.generate();
                }
            });
        });
    }

    /**
     * 初始化加载动画
     */
    initLoadingAnimation() {
        const container = document.getElementById('wordCloudContainer');
        this.loadingOverlay = document.createElement('div');
        this.loadingOverlay.className = 'loading-overlay';
        this.loadingOverlay.innerHTML = `
            <div class="spinner"></div>
            <div class="loading-text">正在生成词云...</div>
        `;
        container.appendChild(this.loadingOverlay);
    }

    /**
     * 获取当前设置的尺寸
     */
    getDimensions() {
        return {
            width: parseInt(document.getElementById('widthInput').value),
            height: parseInt(document.getElementById('heightInput').value)
        };
    }

    /**
     * 分词函数
     * @param {string} text - 输入的文本
     */
    tokenize(text) {
        const chineseRegex = /[\u{4E00}-\u{9FFF}]{2,}/gu;
        const englishRegex = /\b[a-zA-Z']+\b/gu;
        return [
            ...(text.match(chineseRegex) || []),
            ...(text.match(englishRegex) || [])
        ];
    }

    /**
     * 计算词频
     * @param {Array} words - 分词结果
     */
    calculateFrequencies(words) {
        return words.reduce((acc, word) => {
            const key = word.toLowerCase().trim();
            if (key) acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * 创建画布
     */
    createCanvas() {
        const container = document.getElementById('wordCloudContainer');
        container.innerHTML = '';
        const canvas = document.createElement('canvas');

        const { width, height } = this.getDimensions();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        container.appendChild(canvas);
        return canvas;
    }

    /**
     * 生成词云
     */
    async generate() {
        try {
            // 新增确认弹窗
            if (!window.confirm('确定要生成新的词云吗？当前词云将被替换。')) {
                return;
            }

            this.showLoading(true);

            const text = document.getElementById('textInput').value.trim();
            if (!text) return this.showAlert('请输入有效文本内容');

            const words = this.tokenize(text);
            if (words.length === 0) return this.showAlert('未检测到有效词汇');

            const frequencies = this.calculateFrequencies(words);
            const wordList = Object.entries(frequencies)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 50)
                .map(([text, size]) => [text, size * 15]);

            const canvas = this.createCanvas();
            await this.renderWordCloud(canvas, wordList);
            this.isValid = true;

            // 播放成功动画
            this.playSuccessAnimation();
        } catch (error) {
            console.error('生成失败:', error);
            this.showAlert(`生成失败: ${error.message}`);
            this.isValid = false;
        } finally {
            this.showLoading(false);
        }
    }

    /**
     * 渲染词云
     * @param {HTMLCanvasElement} canvas - 画布元素
     * @param {Array} wordList - 词云数据
     */
    renderWordCloud(canvas, wordList) {
        return new Promise((resolve, reject) => {
            try {
                this.cloudInstance = WordCloud(canvas, {
                    list: wordList,
                    backgroundColor: '#ffffff',
                    weightFactor: size => size,
                    color: () => `hsl(${Math.random() * 360}, 70%, 50%)`,
                    rotateRatio: 0.35,
                    rotationSteps: 3,
                    gridSize: 12,
                    minSize: 14,
                    wait: 100,
                    abortThreshold: 10000,
                    hover: window.devicePixelRatio > 1 ? null : undefined
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * 下载词云图片
     */
    download() {
        // 新增确认弹窗
        if (!window.confirm('确定要下载当前词云图片吗？')) {
            return;
        }

        if (!this.isValid) return this.showAlert('请先生成有效词云');

        try {
            const canvas = document.querySelector('#wordCloudContainer canvas');
            const link = document.createElement('a');
            link.download = `wordcloud_${Date.now()}.png`;
            link.href = canvas.toDataURL('image/png');

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            this.showAlert(`下载失败: ${error.message}`);
        }
    }

    /**
     * 处理窗口大小变化
     */
    handleResize() {
        if (this.cloudInstance) {
            this.generate();
        }
    }

    /**
     * 显示加载状态
     * @param {boolean} show - 是否显示加载状态
     */
    showLoading(show) {
        this.loadingOverlay.style.display = show ? 'flex' : 'none';
    }

    /**
     * 播放成功动画
     */
    playSuccessAnimation() {
        const container = document.getElementById('wordCloudContainer');
        container.style.animation = 'fadeIn 0.5s';
        setTimeout(() => {
            container.style.animation = '';
        }, 500);
    }

    /**
     * 显示提示信息
     * @param {string} message - 提示内容
     */
    showAlert(message) {
        const alertBox = document.createElement('div');
        alertBox.className = 'alert-box';
        alertBox.textContent = message;

        document.body.appendChild(alertBox);
        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new WordCloudGenerator();
});