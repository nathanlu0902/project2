document.addEventListener('DOMContentLoaded',()=>{

    var name=document.querySelector('#msg');

    name.innerHTML=`Welcome ${localStorage.getItem('displayname')}`;

    document.querySelector('#submit1').disabled=true;
    document.querySelector('#username').onkeyup=()=>{
        if (document.querySelector('#username').value.length>0)
            document.querySelector('#submit1').disabled=false;
        else
            document.querySelector('#submit1').disabled=true;
        }
    document.querySelector('#displayname').onsubmit=()=>{
        const username=document.querySelector('#username').value;
        localStorage.setItem('displayname',username);
        name.innerHTML=`Welcome ${localStorage.getItem('displayname')}`
        document.querySelector('#submit1').disabled=true;
        return false;
    }

    var socket=io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    socket.on('connection',()=>{
        document.querySelector("#addchannel").onSubmit=()=>{
            // const li=document.createElement('li')
            const newchannel=document.querySelector("#channel").value
            // li.innerHTML=newchannel
            // document.querySelector("#channellist").append(channelitem)
            socket.emit('add channel',newchannel)
            return false;
        }
    })
    
    socket.on('add channel',data=>{
         const channels=document.querySelector("#channellist");
         const li=document.createElement("li");
         li.innerHTML=data;
         channels.append(li);  
    });
})