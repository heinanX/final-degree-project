# Date: 01-02-2023

# RETROSPECTIVE 1


**Last week's sprint** was focused on project setup and implementing all the logic for customer-related functionality. Due to a limited number of workdays, I found this approach beneficial for ensuring a solid foundation as I started this week. My goal is to complete my backend by the end of this week.

**A major challange** was related to TypeScript. A task that I initially estimated to take 5 minutes ended up taking over 2 hours, primarily due to a typing error (and partly because I was serving TypeScript with ts-node). Despite the frustration, this experience was valuable as it highlighted potential issues when working with ts-node in the future.

**What I find most rewarding** is that, even after numerous repetitions of writing similar functions, I continue to learn new things. I strive to adopt different approaches each time I work on a backend, not by reinventing the things completely, but by examining functions from alternative perspectives or incorporating new npm packages. For instance, in this project, I opted for express-session over cookie-session for my login functionality.

**I made an addition to my project board** by introducing a section titled 'Could Be Improved On.' This will serve as a space for logging future low-priority issues, where, if time allows, code improvements can be made. I felt the need for this when I wrote the logic for my editUser function. As I wrote it, I identified room for improvement and I'm also contemplating the idea of splitting this function into different endpoints. Users would then make distinct posts to separate endpoints when they wish to modify specific details, such as changing their username or password. In order to not get stuck on the little things, I have decided to leave this to the future though, if there is time.