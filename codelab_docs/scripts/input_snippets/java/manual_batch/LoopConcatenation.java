public class LoopConcatenation {
    public static void main(String[] args) {
        String res = "";
        for (int i = 0; i < 1000; i++) {
            res += i + " ";
        }
        System.out.println(res);
    }
}
