<div >
<MyNavbar></MyNavbar>
<div>
<div className="completed-box textst"> {props.user}'s Completed Todo  </div>

{

    props.data1.map((a,i) => {
        let x = a._id.toString()
        if(a.complete == false) {
        return (
            <Container style={{ display: 'flex' }}  key={a._id}>

                    <div className="small-square" >
                    <div className="top-left textst" onClick={() => {
                        navigate('/')
                    }}>{a.date}</div>

                    
                    <Link to={`/detail/${x}`} className="bottom-left textst">{a.title}</Link>

                    <Button className="bottom-right-completed" onClick={() => {

                        /* axios.post(`http://localhost:8080/modify/${a._id}`, {
                        })
                        .then(response => {
                            let copy3 = [...props.data1]
                            props.setData1(copy3)
                            console.log(response)
                        })
                        .catch(error => {
                            console.log(error);
                        }); */
                        handleComplete(a._id)
                    }}> Complete! </Button>


                    <Button className="bottom-right-delete" variant="danger" 
                    onClick={(e) => {
                        handleDelete(a._id,i)
                    }}
                    > Delete </Button>
                </div>
             </Container>
        )}

        else {
            return (
                <Container style={{ display: 'flex'}}  key={a._id}>
                    <div className="small-square2 textst" >  {a.date}   {a.title} 
                    <Button className="bottom-right-delete" variant="danger" 
                    style={{ display: 'inline',marginLeft: 250, marginTop:1}} 
                    onClick={(e) => {
                        handleDelete(a._id,i)
                    }}
                    > Delete </Button>
                    </div>

                </Container>
            )
        }
    })

    
}


</div>


</div>