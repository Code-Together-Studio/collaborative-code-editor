package ua.knu.backend.exception.codesnippet;

public class CodeSnippetWithNameExistsException extends RuntimeException{

    public CodeSnippetWithNameExistsException(String message) {
        super("name {" + message+"} exist");
    }
}
