-- 创建数据库
CREATE DATABASE IF NOT EXISTS aad DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE aad;

-- 检测记录表
CREATE TABLE detection_record (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    text        TEXT        NOT NULL COMMENT '检测文本',
    ai_rate     DOUBLE      NOT NULL COMMENT 'AI 含量百分比',
    summary     VARCHAR(500) NULL COMMENT '检测摘要',
    language    VARCHAR(10) NOT NULL DEFAULT 'zh' COMMENT '语言',
    created_at  DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) COMMENT '检测记录';

-- 改写记录表
CREATE TABLE rewrite_record (
    id               BIGINT AUTO_INCREMENT PRIMARY KEY,
    original_text    TEXT        NOT NULL COMMENT '原文',
    rewritten_text   TEXT        NOT NULL COMMENT '改写后文本',
    original_ai_rate DOUBLE      NOT NULL COMMENT '原文 AI 率',
    rewritten_ai_rate DOUBLE     NOT NULL COMMENT '改写后 AI 率',
    style            VARCHAR(20) NOT NULL DEFAULT 'conversational' COMMENT '改写风格',
    target_ai_rate   INT         NOT NULL DEFAULT 30 COMMENT '目标 AI 率',
    language         VARCHAR(10) NOT NULL DEFAULT 'zh' COMMENT '语言',
    created_at       DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) COMMENT '改写记录';

-- 插入示例检测记录
INSERT INTO detection_record (text, ai_rate, summary, language) VALUES
('人工智能正在改变世界。深度学习算法的进步使得计算机视觉和自然语言处理取得了突破性进展。', 85.0, '高 AI 特征文本，存在明显的大模型生成模式', 'zh'),
('今天天气真好，我去了公园散步。花都开了，空气中弥漫着春天的气息。', 3.0, '人类写作特征明显，表达自然流畅', 'zh'),
('基于Transformer架构的大语言模型展现了惊人的能力。通过海量数据的预训练和人类反馈的强化学习，这些模型能够理解复杂的语义关系。', 92.0, '极高 AI 概率，典型的技术文档生成风格', 'zh');

-- 插入示例改写记录
INSERT INTO rewrite_record (original_text, rewritten_text, original_ai_rate, rewritten_ai_rate, style, target_ai_rate, language) VALUES
('基于Transformer架构的大语言模型展现了惊人的能力。通过海量数据的预训练和人类反馈的强化学习，这些模型能够理解复杂的语义关系。', '我最近研究了一下那些大型语言模型，发现它们真的挺厉害的。这些模型靠着海量的数据训练，再加上人工反馈的帮忙，居然能理解那么复杂的语义关系。', 92.0, 25.0, 'conversational', 30, 'zh'),
('人工智能正在改变世界。深度学习算法的进步使得计算机视觉和自然语言处理取得了突破性进展。', '说到 AI 对世界的影响，我觉得最明显的就是计算机视觉和自然语言处理这两块。深度学习算法这几年进步飞快，确实带来了不少突破。', 85.0, 20.0, 'conversational', 25, 'zh');
