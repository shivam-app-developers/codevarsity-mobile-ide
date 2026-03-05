public class StringComparison {
    public static void main(String[] args) {
        String s1 = new String("hello");
        String s2 = new String("hello");

        if (s1 == s2) { // BUG: Should use .equals()
            System.out.println("Strings are equal");
        } else {
            System.out.println("Strings are NOT equal");
        }
    }
}
