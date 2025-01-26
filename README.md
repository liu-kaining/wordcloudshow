# **词云生成器**

**词云生成器** 是一个基于 Flask 和 WordCloud2.js 的在线工具，能够将输入的文本转换为美观的词云图片，并支持高清下载。该项目专为需要快速生成词云的用户设计，适用于数据分析、文本可视化等场景。


## **功能特性**

### **1. 文本输入与词云生成**
- 支持中英文混合文本输入。
- 自动分词并统计词频。
- 实时生成词云，支持自定义尺寸（300px - 2000px）。

### **2. 高清图片下载**
- 生成高分辨率词云图片（支持 Retina 屏幕）。
- 下载的图片为 PNG 格式，背景为纯白色，适合打印和分享。

### **3. 交互体验优化**
- 生成词云前弹出确认弹窗，避免误操作。
- 下载图片前弹出确认弹窗，确保用户意图。
- 提供加载动画和成功动画，提升用户体验。

### **4. 响应式设计**
- 支持桌面端和移动端访问。
- 自适应布局，确保在不同设备上都能良好显示。

### **5. 自定义配置**
- 支持调整词云的宽度和高度。
- 自动配色方案，确保词云美观。

---

## **技术栈**

### **前端**
- **HTML/CSS**：页面结构和样式。
- **JavaScript**：交互逻辑和词云生成。
- **WordCloud2.js**：词云渲染库。

### **后端**
- **Flask**：轻量级 Python Web 框架，用于服务端渲染和静态文件服务。

---

## **快速开始**

### **1. 安装依赖**
确保已安装 Python 和 pip，然后运行以下命令：
```bash
pip install flask
```

### **2. 下载项目**
克隆项目到本地：
```bash
git clone https://github.com/your-repo/wordcloud-generator.git
cd wordcloud-generator
```

### **3. 启动服务**
运行 Flask 应用：
```bash
python app.py
```

### **4. 访问应用**
打开浏览器，访问：
```
http://localhost:5000
```

---

## **使用说明**

1. **输入文本**：
   - 在左侧输入框中粘贴或输入文本内容。
   - 支持中英文混合文本。

2. **调整尺寸**：
   - 在宽度和高度输入框中设置词云尺寸（300px - 2000px）。

3. **生成词云**：
   - 点击“生成词云”按钮，等待词云渲染完成。

4. **下载图片**：
   - 点击“下载图片”按钮，保存高清 PNG 图片。

---

## **项目结构**

```
wordcloud-generator/
├── app.py                  # Flask 服务端程序
├── templates/
│   └── index.html          # 前端页面模板
└── static/
    ├── css/
    │   └── style.css       # 样式表
    ├── js/
    │   ├── main.js         # 前端交互逻辑
    │   └── wordcloud2.min.js # WordCloud2.js 库
    └── images/             # 静态图片资源
```

---

## **示例**

### **输入文本**
```
自然语言处理（NLP）是人工智能领域的重要分支，近年来随着深度学习的发展，Transformer架构在机器翻译、文本生成等任务中取得了显著进展。BERT、GPT等模型已经成为现代NLP系统的基石。
```

---

## **贡献指南**

欢迎贡献代码！以下是参与项目的步骤：
1. Fork 本项目。
2. 创建新的分支：
   ```bash
   git checkout -b feature/your-feature
   ```
3. 提交代码并推送：
   ```bash
   git commit -m "Add your feature"
   git push origin feature/your-feature
   ```
4. 提交 Pull Request。

---

## **许可证**

本项目采用 [MIT 许可证](LICENSE)。

---

## **联系作者**

- **作者** liqian_liukaining
- **GitHub**：[https://github.com/liu-kaining/wordcloudshow](https://github.com/liu-kaining/wordcloudshow)

---

希望这个文档能帮助您更好地了解和使用 **词云生成器**！如果有任何问题或建议，欢迎联系我！