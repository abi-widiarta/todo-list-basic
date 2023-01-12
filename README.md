# Well hey there!

- This is just a simple to do list made with js
- It's fun doing fetch tho

- I encountered several of problems at first including :
  1. fetch method "get" was executed earlier than fetch method "post"
     = the solution is to put fetch method get after post async
     
  2. when deleting an item, after that the code will append the array again, but the array on the ul became duplicated
     = the solution is to reassign the array into "" first, then continue to append the rest
     
  3. somehow my prettier extentions on vsc doesn't work like i wanted to, especially the word wrap when doing async
     that's why some of the line in my code maybe doesn't have semicolon at the end of it cuz i used to rely on prettier on doing that
     = no solution yet to be found, soon i hope
 
# I think that's all for now
     
