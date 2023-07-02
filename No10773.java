import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class No10773 {
	public static void main(String[] args) {	
		Scanner sc = new Scanner(System.in);
		int num;		
		num = sc.nextInt();
		int sum = 0;
		
		int[] sum_num = new int[num];	
		
		for(int i= 0 ; i<num; i++ ) {
			sum_num[i]=sc.nextInt();
		}
		
		 List<Integer> list = new ArrayList<>();
		 for (int i = 0; i < sum_num.length; i++) {
			    list.add(sum_num[i]);
			}
		 
		 for (int i = 0; i < list.size(); i++) {
		    if(list.get(i).equals(0)) {
		    	list.remove(i);
		    	list.remove(i-1);
		    	i-=2;
		    }
		    
		}

	    for (Integer element: list) {
	        sum += element ;
	    }
		
		System.out.println(sum);

		
	}
}