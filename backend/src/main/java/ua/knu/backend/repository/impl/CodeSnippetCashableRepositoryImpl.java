package ua.knu.backend.repository.impl;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.repository.CodeSnippetCashableRepository;
import ua.knu.backend.repository.CodeSnippetRepository;

import java.util.Objects;

@Repository
public class CodeSnippetCashableRepositoryImpl implements CodeSnippetCashableRepository {

    private final RedisTemplate<String, String> redisTemplate;

    private final CodeSnippetRepository codeSnippetRepository;

    public CodeSnippetCashableRepositoryImpl(RedisTemplate<String, String> redisTemplate, CodeSnippetRepository codeSnippetRepository) {
        this.redisTemplate = redisTemplate;
        this.codeSnippetRepository = codeSnippetRepository;
    }

    @Override
    public String getContentById(Integer id) {
        String content = redisTemplate.opsForValue().get(generateKey(id));
        if (Objects.nonNull(content)){
            return content;
        }
        CodeSnippet codeSnippet = codeSnippetRepository.findById(id).get();
        redisTemplate.opsForValue().set(generateKey(id), codeSnippet.getContent());
        return codeSnippet.getContent();
    }

    @Override
    public void updateContentById(Integer id, String content) {
        redisTemplate.opsForValue().set(generateKey(id), content);
    }

    @Override
    public void deleteById(Integer id) {
        redisTemplate.delete(generateKey(id));
    }

    private String generateKey(Integer id){
        return "codeSnippetKey="+id;
    }
}
