import java.util.Scanner;

public class No9935 {
	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
        String str= scan.nextLine();
        String str2= scan.nextLine();
        String strNew;
		      
        while (true) {
    		strNew = str.replace(str2, "");
    		if(strNew != str) { 
    			str=strNew;
    		}else {        
    			break;
    		}
		}
		if(strNew == "") {System.out.println("FRULA");
		}else{System.out.println(strNew);};
	}
}