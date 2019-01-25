const muaRau  = (tien)=>{
    return new Promise((resolve, reject) => {
        if(tien>1000){
            resolve("rau");
        }else{
            reject("Thieu tien roi")
        }
    });
}

muaRau(10000).then((resul))