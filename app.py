"""
词云生成器服务端程序
作者：liqian_liukaining
日期：2025年1月26日
"""

from flask import Flask, render_template, send_from_directory
import os

# 初始化Flask应用
app = Flask(__name__)
app.config['STATIC_FOLDER'] = 'static'


@app.route('/')
def index():
    """主页面路由"""
    return render_template('index.html')


@app.route('/static/<path:filename>')
def static_files(filename):
    """静态文件路由"""
    return send_from_directory(app.config['STATIC_FOLDER'], filename)


if __name__ == '__main__':
    # 自动创建目录结构
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    os.makedirs('static/images', exist_ok=True)

    # 启动Flask服务
    app.run(host='0.0.0.0', port=5000, debug=True)