document.querySelector(".form-salary");const t=document.querySelector(".input-salary"),n=document.querySelector(".input-profitability"),e=document.querySelector(".input-save-salary"),a=document.querySelector(".form-output");function r(t){t=Math.round(t);let n="";for(;t>1e3;){let e=t%1e3;0===e&&(e="000"),t=Math.floor(t/1e3),n=`${e} ${n}`}return n=`${t} ${n}`,n}function o(){const o=Number(t.value),d=Number(n.value)/100,s=Number(e.value)/100,c=Math.round(o*s),i=Math.round(12*c),u=Math.round(i*d);Math.round(u/12);a.innerHTML=`\n\t\t<div class="info">\n\t\t\t<div class="info__item">\n\t\t\t\tОткладываем в месяц: <span class="white-space-nowrap">${r(c)}</span>\n\t\t\t</div>\n\t\t\t<div class="info__item">\n\t\t\t\tОткладываем в год: <span class="white-space-nowrap">${r(i)}</span>\n\t\t\t</div>\n\t\t</div>\n\t`;const l=function({salary:t,profitabilityPercent:n,saveSalaryPercent:e}){const a=Math.round(t*e*12);let r=a*(1+n),o=Math.round(r/12*n),d=a,s=Math.round(d*n);const c=[{year:1,postponned:d,percents:s,capital:r,passiveSalary:o}];for(let e=2;o<t;e++)r=Math.round((r+a)*(1+n)),s=Math.round(r-a*e),o=Math.round(r/12*n),d+=a,c.push({year:e,postponned:d,percents:s,capital:r,passiveSalary:o});return c}({salary:o,profitabilityPercent:d,saveSalaryPercent:s}),p=function(t){const n=document.createElement("table"),e=document.createElement("tbody"),a=document.createElement("div");n.classList.add("table"),n.innerHTML="\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th>Год</th>\n\t\t\t\t<th>Отложили <br> в <br>сумме</th>\n\t\t\t\t<th>Накапало<br> процентов</th>\n\t\t\t\t<th>Отложили <br>+<br> проценты</th>\n\t\t\t\t<th>Пассивный<br> доход</th>\n\t\t\t</tr>\n\t\t</thead>\n\t";for(const{year:n,postponned:a,percents:r,capital:o,passiveSalary:d}of t)e.innerHTML+=`\n\t\t\t<tr>\n\t\t\t\t<td>${n}</td>\n\t\t\t\t<td>${a}</td>\n\t\t\t\t<td>${r}</td>\n\t\t\t\t<td>${o}</td>\n\t\t\t\t<td>${d}</td>\n\t\t\t</tr>\n\t\t`;return n.appendChild(e),a.classList.add("table-wrapper"),a.appendChild(n),a}(l);a.appendChild(p)}[t,n,e].forEach((t=>{t.addEventListener("input",(t=>{!function(t){const n=t.target;if(!n.checkValidity()){const t=Number(n.value),e=Number(n.min),a=Number(n.max),r=Math.abs(t-e),o=Math.abs(t-a);n.value=r>=o?n.max:n.min}}(t),o()}))})),o();
//# sourceMappingURL=index.cb009471.js.map
