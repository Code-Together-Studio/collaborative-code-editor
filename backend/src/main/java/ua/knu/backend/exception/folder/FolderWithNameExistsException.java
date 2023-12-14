package ua.knu.backend.exception.folder;

public class FolderWithNameExistsException extends RuntimeException {

    public FolderWithNameExistsException(String message) {
        super("name {" + message + "} exist");
    }
}
