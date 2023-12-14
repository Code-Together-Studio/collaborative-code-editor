package ua.knu.backend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import ua.knu.backend.helpers.DiffResult;
import ua.knu.backend.helpers.DiffService;
import ua.knu.backend.helpers.Operation;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DiffServiceTests {
    @ParameterizedTest
    @MethodSource("provideDiffTestCases")
    public void testStringDiff(String original, String current, DiffResult res) {
        DiffResult result = DiffService.findDiffIndexes(original, current);
        Assertions.assertEquals(res.getOperation(), result.getOperation());
        Assertions.assertEquals(res.getStartIndex(), result.getStartIndex());
        Assertions.assertEquals(res.getEndIndex(), result.getEndIndex());
    }

    private static Stream<Arguments> provideDiffTestCases() {
        return Stream.of(
                Arguments.of("Hello world", "Hello world", new DiffResult(-1, -1, Operation.NO_CHANGE)),
                Arguments.of("", "a", new DiffResult(0, 0, Operation.INSERT)),
                Arguments.of("abc", "abcd", new DiffResult(3, 3, Operation.INSERT)),
                Arguments.of("abcdeg", "abc", new DiffResult(3, 5, Operation.DELETE)),
                Arguments.of("abc", "dabc", new DiffResult(0, 0, Operation.INSERT)),
                Arguments.of("abcdeg", "deg", new DiffResult(0, 2, Operation.DELETE)),
                Arguments.of("abcdslmn", "abcdklmn", new DiffResult(4, 4, Operation.REPLACE)),
                Arguments.of("abcd\nlmn", "abcdklmn", new DiffResult(4, 4, Operation.REPLACE)),
                Arguments.of("abcdgkm", "ablkm", new DiffResult(2, 4, Operation.REPLACE)),
                Arguments.of("abcdslmn", "abcdkslmn", new DiffResult(4, 4, Operation.INSERT)),
                Arguments.of("abcdslmn", "abmn", new DiffResult(2, 5, Operation.DELETE)),
                Arguments.of("abcdgkm", "", new DiffResult(0,6, Operation.DELETE)),
                Arguments.of("abcdgkm", "f", new DiffResult(0,6, Operation.REPLACE)),
                Arguments.of("abcdgkm", "fdgkm", new DiffResult(0,2, Operation.REPLACE)),
                Arguments.of("abcdgkm", "abcf", new DiffResult(3,6, Operation.REPLACE))
        );
    }
}
