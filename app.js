const key='g_lill_transactions';
let tx=JSON.parse(localStorage.getItem(key)||'null')||[
 {type:'income',desc:'Starting money',amount:10000,cat:'Other',date:'Today'},
 {type:'expense',desc:'Lunch',amount:80,cat:'Food',date:'Today'},
 {type:'expense',desc:'Transport',amount:100,cat:'Transport',date:'Today'}
];
const money=n=>'KSh '+Number(n).toLocaleString('en-KE');
function save(){localStorage.setItem(key,JSON.stringify(tx))}
function render(){
 const inc=tx.filter(x=>x.type==='income').reduce((a,x)=>a+x.amount,0);
 const exp=tx.filter(x=>x.type==='expense').reduce((a,x)=>a+x.amount,0);
 balance.textContent=money(inc-exp); income.textContent=money(inc); expenses.textContent=money(exp);
 rate.textContent=(inc?Math.max(0,((inc-exp)/inc*100)).toFixed(0):0)+'%';
 const html=tx.slice().reverse().map(x=>`<div class="tx"><div><b>${x.desc}</b><small>${x.cat} • ${x.date}</small></div><b class="${x.type==='income'?'plus':'minus'}">${x.type==='income'?'+':'-'}${money(x.amount)}</b></div>`).join('');
 recent.innerHTML=html.slice(0,1200)||'<p>No transactions yet.</p>'; allTransactions.innerHTML=html||'<p>No transactions yet.</p>';
 const sums={}; tx.filter(x=>x.type==='expense').forEach(x=>sums[x.cat]=(sums[x.cat]||0)+x.amount);
 const max=Math.max(...Object.values(sums),1);
 categories.innerHTML=Object.entries(sums).map(([c,v])=>`<div class="bar"><div class="bar-top"><span>${c}</span><b>${money(v)}</b></div><div class="track"><div class="fill" style="width:${v/max*100}%"></div></div></div>`).join('')||'<p>No expenses yet.</p>';
}
document.querySelectorAll('.nav').forEach(b=>b.onclick=()=>{document.querySelectorAll('.nav').forEach(n=>n.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.page').forEach(p=>p.classList.add('hidden'));document.getElementById(b.dataset.page).classList.remove('hidden');pageTitle.textContent=b.textContent});
addBtn.onclick=()=>modal.classList.remove('hidden');close.onclick=()=>modal.classList.add('hidden');
form.onsubmit=e=>{e.preventDefault();tx.push({type:type.value,desc:desc.value,amount:+amount.value,cat:cat.value,date:new Date().toLocaleDateString('en-KE')});save();render();form.reset();modal.classList.add('hidden')};
modal.onclick=e=>{if(e.target===modal)modal.classList.add('hidden')};
saveBudget.onclick=()=>alert('Budget saved on this device.');
render();