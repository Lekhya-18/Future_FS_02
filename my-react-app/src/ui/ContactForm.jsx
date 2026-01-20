function ContactForm(){
    const handleSubmit = async (e) => {
    e.preventDefault();
    const leadData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };
    await fetch("http://localhost:5000/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData)
    });

    alert("Form submitted");
  };
  
    return(
    <div style={{padding:"20px"}}>
    <form>
     <input type="text" placeholder="Enter Name" /> <br /><br />
     <input type="email" placeholder="Enter Email "/> <br /><br />
     <textarea placeholder="Message"></textarea> <br /><br />
     <button> Submit </button> <br />
    </form>
    </div>
 );
}
export default ContactForm;