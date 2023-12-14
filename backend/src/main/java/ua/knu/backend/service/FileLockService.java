package ua.knu.backend.service;

public interface FileLockService {
    void Lock(Integer fileId, String sessionId);
    void Unlock(Integer fileId, String sessionId);
    boolean AnyOtherLocks(Integer fileId, String sessionId);
}
