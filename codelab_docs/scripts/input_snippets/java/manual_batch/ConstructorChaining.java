public class ConstructorChaining {
    private String name;
    private int age;

    public ConstructorChaining() {
        this("Unknown", 0);
    }

    public ConstructorChaining(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void display() {
        System.out.println(name + " is " + age + " years old.");
    }

    public static void main(String[] args) {
        new ConstructorChaining().display();
    }
}
