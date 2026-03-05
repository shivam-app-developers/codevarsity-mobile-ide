import java.util.ArrayList;
import java.util.List;

public class ListModification {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>();
        items.add("A");
        items.add("B");
        items.add("C");

        for (String item : items) {
            if (item.equals("B")) {
                items.remove(item); // BUG: ConcurrentModificationException
            }
        }
    }
}
