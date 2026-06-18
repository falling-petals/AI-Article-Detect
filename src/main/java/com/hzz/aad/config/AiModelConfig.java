package com.hzz.aad.config;

import com.alibaba.cloud.ai.dashscope.chat.DashScopeChatOptions;
import com.hzz.aad.util.MultiModelDetector;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class AiModelConfig {

    @Bean
    public ChatClient chatClient(ChatModel chatModel,
                                 @Value("${spring.ai.dashscope.chat.options.model}") String modelName) {
        var options = DashScopeChatOptions.builder();
        if (MultiModelDetector.isMultimodal(modelName)) {
            log.info("检测到多模态模型: {}, 自动启用 multiModel=true", modelName);
            options.withMultiModel(true);
        }
        return ChatClient.builder(chatModel)
                .defaultAdvisors(new SimpleLoggerAdvisor())
                .defaultOptions(options.build())
                .build();
    }

}
