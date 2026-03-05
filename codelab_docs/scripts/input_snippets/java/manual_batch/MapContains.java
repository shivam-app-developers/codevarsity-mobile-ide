import java.util.HashMap;
import java.util.Map;

public class MapContains {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 90);

        if (scores.get("Bob") > 50) { // BUG: NullPointerException
            System.out.println("Bob passed");
        }
    }
}
