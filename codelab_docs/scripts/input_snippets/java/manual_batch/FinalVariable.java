public class FinalVariable {
    public static void main(String[] args) {
        final int MAX_USERS = 100;
        if (args.length > 0) {
            MAX_USERS = 200; // BUG: Cannot assign a value to final variable 'MAX_USERS'
        }
        System.out.println("Max Users: " + MAX_USERS);
    }
}
