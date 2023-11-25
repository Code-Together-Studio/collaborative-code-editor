package ua.knu.backend.repository;

public interface CodeSnippetCashableRepository {

    String getContentById(Integer id);

    void updateContentById(Integer id, String content);

    void deleteById(Integer id);
}
