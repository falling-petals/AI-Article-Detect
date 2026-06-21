# AI 文章检测系统

基于大语言模型的 AI 生成内容检测与改写平台。用户粘贴文章即可检测 AI 生成概率，
并支持多风格改写以降低 AI 痕迹，适用于学术诚信检查、内容审核等场景。

**核心能力：**
- AI 检测 —— 逐段分析文本，给出 AI 生成概率及判断依据
- 智能改写 —— 支持 5 种写作风格，可自定义目标 AI 率，改写后提供原文对照和逐处批注

**技术栈：** React 19 + TypeScript + Spring Boot 3 + 阿里云百炼 DashScope

## 快速开始

### Docker 部署（仅后端）

```bash
git clone https://github.com/falling-petals/AI-Article-Detect.git
cd AI-Article-Detect
```

创建 `.env` 文件：
```
DASHSCOPE_API_KEY=你的阿里云百炼API Key
AI_MODEL=qwen3.6-flash
```

启动：
```bash
docker-compose up -d
```

后端运行在 `http://localhost:8081`，需配合前端一起使用。

### 本地开发

**后端**（需 Java 21 + Maven）：
```bash
./mvnw spring-boot:run
```

**前端**（需 Node.js）：
```bash
cd frontend
npm install
npm run dev
```

前端开发服务器运行在 `http://localhost:5173`，已配置代理自动转发 API 请求到后端。

## 环境变量

| 变量 | 说明 | 默认值 |
|---|---|---|
| DASHSCOPE_API_KEY | 阿里云百炼 DashScope API Key | 必填 |
| AI_MODEL | 大模型名称 | qwen3.6-flash |
