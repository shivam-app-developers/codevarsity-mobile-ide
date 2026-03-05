import java.io.IOException;

public class ExceptionOrder {
    public static void main(String[] args) {
        try {
            throw new IOException("File error");
        } catch (Exception e) { // BUG: This catches everything, IOException below is unreachable
            System.out.println("General error");
        } catch (IOException ioe) {
            System.out.println("Specific IO error");
        }
    }
}
