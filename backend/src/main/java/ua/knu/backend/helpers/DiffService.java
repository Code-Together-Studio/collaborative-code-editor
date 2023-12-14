package ua.knu.backend.helpers;

public class DiffService {
    public static DiffResult findDiffIndexes(String original, String current) {
        if (original == null) {
            return new DiffResult(0, 0, Operation.INSERT);
        }

        if (original.equals(current)) {
            return new DiffResult(-1, -1, Operation.NO_CHANGE);
        }

        int start = -1;
        int end = -1;
        String operation = Operation.NO_CHANGE;

        int minLength = Math.min(original.length(), current.length());
        for (int i = 0; i < minLength; i++) {
            if (original.charAt(i) != current.charAt(i)) {
                start = i;
                break;
            }
        }

        if (start == -1) {
            start = minLength;
        }

        if (original.length() < current.length()) {
            operation = Operation.INSERT;
            end = start;
        } else if (original.length() == current.length()) {
            operation = Operation.REPLACE;
            end = start;
        } else {
            for (int i = original.length() - 1, j = current.length() - 1; i >= start && j >= start; i--, j--) {
                if (original.charAt(i) != current.charAt(j)) {
                    end = Math.max(i, j);
                    break;
                }
            }

            if (end == -1 || current.length() + end - start + 1 == original.length()) {
                operation = Operation.DELETE;
                end = start + original.length() - current.length() - 1;
            } else {
                operation = Operation.REPLACE;
            }
        }

        return new DiffResult(start, end, operation);
    }
}
