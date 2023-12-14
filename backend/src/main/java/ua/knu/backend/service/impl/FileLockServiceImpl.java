package ua.knu.backend.service.impl;

import org.springframework.stereotype.Service;
import ua.knu.backend.entity.FileLock;
import ua.knu.backend.repository.FileLockRepository;
import ua.knu.backend.service.FileLockService;

@Service
public class FileLockServiceImpl  implements FileLockService {

    private final FileLockRepository fileLockRepository;

    public FileLockServiceImpl(FileLockRepository fileLockRepository) {
        this.fileLockRepository = fileLockRepository;
    }

    @Override
    public void Lock(Integer fileId, String sessionId) {
        var lock = fileLockRepository.findByFileIdAndUserSessionId(fileId, sessionId);
        if (lock == null) {
            fileLockRepository.save(new FileLock(0, fileId, sessionId));
        }
    }

    @Override
    public void Unlock(Integer fileId, String sessionId) {
        var fileLock = fileLockRepository.findByFileIdAndUserSessionId(fileId, sessionId);
        fileLockRepository.deleteById(fileLock.getId());
    }

    @Override
    public boolean AnyOtherLocks(Integer fileId, String sessionId) {
        var fileLocks = fileLockRepository.getAllByFileIdAndUserSessionIdNot(fileId, sessionId);
        return !fileLocks.isEmpty();
    }
}
