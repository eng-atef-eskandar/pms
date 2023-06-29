


let title = document.getElementById(`title`)
let price= document.getElementById(`price`)
let taxes= document.getElementById(`taxes`)
let ads = document.getElementById(`ads`)
let discount= document.getElementById(`discount`)
let total = document.getElementById(`total`)
let count = document.getElementById(`count`)
let category= document.getElementById(`category`)
let submit = document.getElementById(`submit`)




let mood = `create`
let update1

// console.log(
//     title,
//     price,
//     taxes,
//     ads,
//     discount,
//     total,
//     count,
//     category,
//     submit
// )

//  * function
//  * 1 get total
function gettotal(params) {
    if (price.value !='' ) {
        let result = (+price.value + +taxes.value+ +ads.value)- +discount.value
        total.innerHTML =result
         total.style.background=`green`
    } else
    {
        total.innerHTML = ''
        total.style.background = `red`
    }
}



//  * 2 create product
//  * save localstorage
let datepro;
if (localStorage.product !=null) {
        datepro=JSON.parse(localStorage.product)

} else {
    datepro=[]
}


submit.onclick =function name(params) {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }


    if (mood===`create`) {
         if (newpro.count > 1) {
             for (let i = 0; i < newpro.count; i++) {
                 datepro.push(newpro)

             }

         } else {
             datepro.push(newpro)
         }
    } else {
        datepro[update1] = newpro
        mood = `create`
        submit.innerHTML = `create`
        count.style.display=`block`
    }


    //  if (newpro.count > 1) {
    //      for (let i = 0; i < newpro.count; i++) {
    //          datepro.push(newpro)

    //      }

    //  } else {
    //      datepro.push(newpro)
    //  }
   
    // datepro.push(newpro)
    localStorage.setItem('product',JSON.stringify(datepro))

    console.log(datepro)
    
    cleardate()
    // readdate()
    showdate()

}




//  let ef
// if (localStorage.product !=null) {
//     te = JSON.parse(localStorage.product)
// } else {
//      te = []
// }




// submit.onclick=function name(params) {
//     let fa = {
//         title: title.value,
//         price: price.value,
//         taxes: taxes.value,
//         ads: ads.value,
//         discount: discount.value,
//         total: this.innerHTML,
//         count: count.value,
//         category: category.value
        
    
//     }
//     te.push(fa)
    

//     localStorage .setItem('product', JSON.stringify(te))

// console.log(te)
// }




















//  * clear inputs
function cleardate(params) {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''

}
//  * read

function showdate()
{
    gettotal()
    let table=''
    for (let i = 0; i < datepro.length; i++) {
        table +=      `
       <tr>
           <td data-title="id : ">${i}</td> 
           <td data-title="title : "> ${datepro[i].title} </td> 
           <td data-title="price : "> ${datepro[i].price} </td> 
           <td data-title="taxes :">  ${datepro[i].taxes}</td> 
           <td data-title="ads :"> ${datepro[i].ads} </td> 
           <td data-title="discount :"> ${datepro[i].discount} </td> 
           <td data-title="total :" >${datepro[i].total}</td> 
           <td data-title="category :"> ${datepro[i].category} </td> 
           <td><button onclick="updatedate(${i})" id = "update"> update </button> </td>
           <td><button onclick="deletedate(${i})" id = "delete"> delete </button> </td>
           </tr>
       
        `
        
    }
    document.getElementById(`tbody`).innerHTML = table


     let btndeleteall=document.getElementById(`deleteall`)
    if (datepro.length>0) {
        btndeleteall.innerHTML = `<button onclick="deleteall()">delete all  (${datepro.length})</button>`
    } else {
        btndeleteall.innerHTML=''
    }
}

showdate()





// function readdate(params)
// {
//     let table = ''
//     for (let i = 0; i < datepro.length; i++) {
//         table += 
        // `

        // < tr >
            
        //     <td > ${i} < /td> 
        //     <td > ${datepro[i].title} < /td>
        //     <td > ${datepro[i].price} < /td> 
        //     <td > ${datepro[i].taxes} < /td> 
        //     < td > ${datepro[i].ads}< /td> 
        //     <td > ${datepro[i].discount}100 < /td>
        //     <td > ${datepro[i].total} < /td> 
        //     <td > ${datepro[i].category} < /td> 
        //     <td > < button id = "update" > update < /button></td >
        //     <td > < button id = "delete" > delete < /button></td >
        //     <td > < /td> 
        //     <td > < /td> 
        //     </tr>`
        

//     }
//     document.getElementById(`tbody`).innerHTML=table
// }

















//  * delete
function deletedate(i)
{

    datepro.splice(i, 1)//تقوم بمسح العنصر من الاري
    localStorage.product = JSON.stringify(datepro)
    showdate()
    // console.log(i)
}







function deleteall(params) {
    localStorage.clear()
    datepro.splice(0)
    showdate()
}

//  * count

//  * update

function updatedate(i)
{
    title.value = datepro[i].title
    price.value = datepro[i].price
    taxes.value = datepro[i].taxes
    ads.value = datepro[i].ads
    discount.value = datepro[i].discount

    category.value = datepro[i].category
    


    gettotal()
    count.style.display = `none`

    submit.innerHTML = `update`
    
    mood = `update`
    update1 = i
    
    scroll({ top: 0 ,behavior:"smooth"})
}






//  * search

let searchmood = `title`

function getsearchmood(id)
{
    let search=document.getElementById(`search`)
    if (id===`searchtitle`) {
        searchmood = `title`
        search.placeholder=`search by title`
    } else {
        searchmood = `category`
        search.placeholder = `search by category`
    }
    
    search.focus()
    search.value = ''
    showdate()
}

function searchdate(value)
{
    let table=''
if (searchmood == 'title') {
    for (let index = 0; index < datepro.length; index++) {
        if (datepro[index].title.includes(value))
            
         table += `<tr>
           <td>${index}</td> 
           <td>${datepro[index].title} </td> 
           <td>${datepro[index].price} </td> 
           <td>${datepro[index].taxes}</td> 
           <td>${datepro[index].ads} </td> 
           <td>${datepro[index].discount} </td> 
           <td>${datepro[index].total}</td> 
           <td>${datepro[index].category} </td> 
           <td><button onclick="updatedate(${index})" id = "update"> update </button> </td>
           <td><button onclick="deletedate(${index})" id = "delete"> delete </button> </td>
           </tr>
       
        `
            
        
    }
} else {
        for (let index = 0; index < datepro.length; index++) {
        if (datepro[index].category.includes(value))
            
         table += `<tr>
           <td>${index}</td> 
           <td>${datepro[index].title} </td> 
           <td>${datepro[index].price} </td> 
           <td>${datepro[index].taxes}</td> 
           <td>${datepro[index].ads} </td> 
           <td>${datepro[index].discount} </td> 
           <td>${datepro[index].total}</td> 
           <td>${datepro[index].category} </td> 
           <td><button onclick="updatedate(${index})" id = "update"> update </button> </td>
           <td><button onclick="deletedate(${index})" id = "delete"> delete </button> </td>
           </tr>
       
        `
            
        
    }
    }    
        document.getElementById(`tbody`).innerHTML = table

}

//  * clean date


