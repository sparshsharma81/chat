HELLO EVERYONE 
you can access this website on 
https://chat-mmln.onrender.com

render takes around 30-40 seconds to load...(depending on different things...)




PROBLEM STATEMENT ----
basically this is really helpful for the individuals which are living on a society or hostel life or any kind of group in college
where people are not comfortable in sharing their mobile numbers but they still want to communicate with each other
so in that cases it can be really helpful 
like on whatsapp you need to share your mobile number in order to communicate ---which doesn't suit for everyone's personal privacy

moreover even on instagram or facebook ---generally people do not uses multiple accounts... 
and if they need to share their profile in order to communicate...

even on telegram you need to login through your mobile number
and all persons who are in your contact..get notifications that you are on telegram
even on telegram there are several privacy issues... 

in order to counter all these problems...i have build this application
 basically my perspective is that in college gruops or events where everyone are not comfortable in sharing their mobile number...
 they can just login into this app.and can communicate...
 moreover in the new updates--- it has gemini feature..so the classmates can share their codes or questions
 and can get solution on website only...

 like in society...where everyone is not comfortable in sharing their personal numbers or personal account usernames...so they can use it...
 



this website is hosted on render 

here(not sure about the next updates) ---at present you need not to enter your mobile number

for the frontend seciton..i have used react + tailwindcss + daisyui
and for the backend section node + express + different frameworks..

for live message transfer i have used websockets.
we can also use the webrtc for calls or message transfer 

and also for the data storage..mongoose
for the photo storing... cloudinary 

and there are also new updates after...
i have fetch the joke and quote api... -- you can test them..you need not to login on that...
and also... i have added the shorts button..if you click on that ..you can view youtube videos..


and i have used the jwt tokens for storing the passwords ....
the hashing techniques ensures that no one even in worse conditon of any kind of cyberattacks...the privacy of users are compromised...
the basic approach in storing the data on mongoose is that it will divide into two sections...
one for data share like fullname , email , password , profile picture etc 
and other for chat like message, timestamp , image etc..


authentication approach...
jaise user ko signup karna hai..
to user click karega button ko..
fir button ke click hone par trigger request generate hogi...
joki client pr jayegi..
request to /api/auth/signup will be generated... 
fir api gateway aur fir database me jayega...


fir ham database me user create karege...aur ham token generate karege... 
and then we will send the token to the client...
send jwt in cookies 
and then display success message...
 ..

 in the cloudinary..only one profile photo can be saved at moment...
 in the updates.. its size limit of image share has increased to 100mb ..so 
 100mb of file can be shared....

 
and the shorts button is working fine...
basically it is fetched from the youtube api..you need not to login to youtube or website in order to view the youtube videos
you can search anything and it will shows vides..basically it is just youtube but on my website...
and there are multiple themes on my website... by default it will set to the internal theme of your laptop  ---- it is done by ctl daisyui online server (just like tailwindcss)





https://chat-mmln.onrender.com

