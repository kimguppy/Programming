import java.util.Scanner;

public class No13909 {
	public static void main(String[] args) {		
		Scanner sc = new Scanner(System.in);
		int n= sc.nextInt();
		int[] nv = new int[n];
		int all=0;
		
		for(int i=1; i<=n; i++) {
			for(int j=i; j<=n; j++) {
				if(j%i==0) {
					if(nv[j-1]==0) {nv[j-1]=1;}
					else {nv[j-1]=0;}
				}
			}
		}
		
		for(int index:nv) {
			if(index==1) {all++;} 
		}
		
		System.out.println(all);
	}
	
}