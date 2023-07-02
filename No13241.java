import java.util.Scanner;

public class No13241 {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		long a= sc.nextInt();
		long b= sc.nextInt();
		long r=1;
		
		long a1=a;
		long b1=b;
		
		while(true) {
			r = a%b;
			if(0<r) {
			a=b;
			b=r;} else {break;}
		}
		
		System.out.println((a1*b1)/b);
	}
}