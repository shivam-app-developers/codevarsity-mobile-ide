public class FactorialRecursion {
    public static int factorial(int n) {
        if (n == 1)
            return 1; // BUG: Fails for factorial(0)
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println("0! = " + factorial(0));
    }
}
