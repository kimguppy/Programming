default rel

section .rodata
str: equ $ - '0' * 4
db "0 1 2 3 4 5 6 7 8 9 101112131415161718"

section .text
global main

main:
xor eax, eax
xor edi, edi
lea rsi, [rsp-4]
mov rdx, 3
syscall

mov dl, [rsi]
add dl, [rsi+2]

lea rsi, [str]
lea rsi, [rsi+rdx*2]
mov rax, 1
mov rdi, 1
mov rdx, 2
syscall

mov rax, 231
xor edi, edi
syscall