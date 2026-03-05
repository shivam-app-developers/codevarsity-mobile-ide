public class StaticContext {
    private int count = 0;

    public static void main(String[] args) {
        count++; // BUG: Non-static field 'count' cannot be referenced from a static context
        System.out.println("Count: " + count);
    }
}
