import { View, Text,Button,TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'
import * as MailComposer from 'expo-mail-composer';
import * as Print from 'expo-print';
import logo from '../../../Image/logo.png'
export default function Email() {
  const [available,setavailable]= useState(false)
  const [recipients,setrecipients]=useState([])
  const [subject,setsubject]= useState(undefined)
  const [body,setbody]= useState(undefined)
  const [email,setemail]= useState(undefined)

  useEffect(()=>{
   async function checkavailable(){
    const available = await MailComposer.isAvailableAsync()
    setavailable(available)
   }
   checkavailable()
  },[])
  const name= 'this is ashutosh'
const html=`
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo! ${name}
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
      <img
      src="${logo}"
      style="width: 90vw;" />
  </body>
</html>
`
   const sendmail=async()=>{
   const {uri}= await Print.printToFileAsync({
html 
  }); 
    

    MailComposer.composeAsync({
      subject:subject,
      body:body,
      recipients:recipients,
      attachments:[uri]
    })
   }
   const addrecipients=()=>{
    let newRecipients=[...recipients]
    newRecipients.push(email)
    setrecipients(newRecipients)
    setemail(undefined)
   }

   const showRecipients=()=>{
    if(recipients.length===0){
      return <Text>no recnxkldj added</Text>
    }
    return recipients.map((recipient,index)=>{
      return <Text key={index}>{recipient}</Text>
    })
   }
  return (
    <View>
      <Text>Email</Text>
      <TextInput placeholder='subject' value={subject} onChangeText={setsubject}/>
      <TextInput placeholder='body' value={body} onChangeText={setbody}/>
      <TextInput placeholder='email' value={email} onChangeText={setemail}/>
   <Button title='add' onPress={addrecipients}/>
   {showRecipients()}
      {available? <Button title='send mail'onPress={sendmail}/> : <Text>email not avaiable</Text>}
    </View>
  )
}