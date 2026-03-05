public class NullPointer {
    public static void main(String[] args) {
        String name = null;
        if (name.length() > 0) { // BUG: NullPointerException
            System.out.println("Name: " + name);
        }
    }
}
