document.querySelector(".form-salary");const t=document.querySelector(".input-salary"),n=document.querySelector(".input-profitability"),e=document.querySelector(".input-save-salary"),a=document.querySelector(".form-output");function r(t){t=Math.round(t);let n="";for(;t>1e3;){let e=t%1e3;0===e&&(e="000"),t=Math.floor(t/1e3),n=`${e} ${n}`}return n=`${t} ${n}`,n}function o(){const o=Number(t.value),u=Number(n.value)/100,d=Number(e.value)/100,c=Math.round(o*d),s=Math.round(12*c),i=Math.round(s*u);Math.round(i/12);a.innerHTML=`\n\t\t<div>\n\t\t\tОткладываем в месяц: <span class="white-space-nowrap">${r(c)}</span>\n\t\t</div>\n\t\t<div>\n\t\t\tОткладываем в год: <span class="white-space-nowrap">${r(s)}</span>\n\t\t</div>\n\t`;const l=function({salary:t,profitabilityPercent:n,saveSalaryPercent:e}){const a=Math.round(t*e*12);let r=a*(1+n),o=Math.round(r/12*n),u=a,d=Math.round(u*n);const c=[{year:1,postponned:u,percents:d,capital:r,passiveSalary:o}];for(let e=2;o<t;e++)r=Math.round((r+a)*(1+n)),d=Math.round(r-a*e),o=Math.round(r/12*n),u+=a,c.push({year:e,postponned:u,percents:d,capital:r,passiveSalary:o});return c}({salary:o,profitabilityPercent:u,saveSalaryPercent:d}),p=function(t){const n=document.createElement("table"),e=document.createElement("tbody");n.classList.add("table"),n.innerHTML="\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th>Год</th>\n\t\t\t\t<th>Отложили в сумме</th>\n\t\t\t\t<th>Накапало процентов</th>\n\t\t\t\t<th>Отложили + проценты</th>\n\t\t\t\t<th>Пассивный доход</th>\n\t\t\t</tr>\n\t\t</thead>\n\t";for(const{year:n,postponned:a,percents:r,capital:o,passiveSalary:u}of t)e.innerHTML+=`\n\t\t\t<tr>\n\t\t\t\t<td>${n}</td>\n\t\t\t\t<td>${a}</td>\n\t\t\t\t<td>${r}</td>\n\t\t\t\t<td>${o}</td>\n\t\t\t\t<td>${u}</td>\n\t\t\t</tr>\n\t\t`;return n.appendChild(e),n}(l);a.appendChild(p)}[t,n,e].forEach((t=>{t.addEventListener("input",(t=>{!function(t){const n=t.target;if(!n.checkValidity()){const t=Number(n.value),e=Number(n.min),a=Number(n.max),r=Math.abs(t-e),o=Math.abs(t-a);n.value=r>=o?n.max:n.min}}(t),o()}))})),o();
//# sourceMappingURL=index.01738557.js.map
