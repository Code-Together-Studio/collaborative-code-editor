package ua.knu.backend.helpers;

public class DiffService {
    private static int[] findDiffIndexes(String original, String current) {
        int start = -1;
        int end = -1;
        int minLength = Math.min(original.length(), current.length());

        for (int i = 0; i < minLength; i++) {
            if (original.charAt(i) != current.charAt(i)) {
                start = i;
                break;
            }
        }

        if (start == -1) {
            if (original.length() != current.length()) {
                start = minLength;
            } else {
                return new int[]{-1, -1};
            }
        }

        // Find the end index of the diff
        for (int i = original.length() - 1, j = current.length() - 1; i >= start && j >= start; i--, j--) {
            if (original.charAt(i) != current.charAt(j)) {
                end = Math.max(i, j);
                break;
            }
        }

        return new int[]{start, end};
    }
}
