public class BinarySearchMid {
    public static int search(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2; // BUG: Potential overflow for large arrays
            if (arr[mid] == target)
                return mid;
            if (arr[mid] < target)
                low = mid + 1;
            else
                high = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] data = { 1, 3, 5, 7, 9 };
        System.out.println("Found at: " + search(data, 5));
    }
}
