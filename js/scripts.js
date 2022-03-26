function CreateCalendar () {
  const date = new Date();
  const tableHeadRowElem = document.querySelector('#table_head');
  const monthsSelectElem = document.querySelector('#month_select');
  const yearInputElem = document.querySelector('#year_input');

  function createHeaders() {
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
    let layout = ''
    layout += `<tr class="calendar__row">`
    layout += days.map(function (item) {
      return `<th class="calendar__cell calendar__cell--head">${item}</th>`
    }).join('')
    layout += `</tr>`
    tableHeadRowElem.innerHTML = layout
  }

  function createCells() {
    const tableBodyElem = document.querySelector('#table_body');
    tableBodyElem.innerHTML = ''
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(year, month, 1).getDay();
    if (firstDay === 0) {
      firstDay = 7;
    }

    for (let i = 0; i < Math.ceil((daysInMonth + firstDay - 1) / 7); i++) {
      const tr = document.createElement('tr');
      tr.className = 'calendar__row'
      for (let j = 0; j < 7; j++) {
        const td = document.createElement('td');
        td.className = 'calendar__cell calendar__cell--content'
        tr.appendChild(td);
        if (j >= 5) {
          td.classList.add('calendar__cell--weekend');
        }
      }
      tableBodyElem.appendChild(tr);
    }

    const cells = tableBodyElem.querySelectorAll('td');
    for (let i = 0; i < daysInMonth; i++) {
      const days = cells[i + (firstDay - 1)];
      days.innerHTML = i + 1;
    }
  }

  function setMonth(value) {
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    if (value === undefined) {
      value = date.getMonth()

      monthNames.forEach(function (item, index) {
        const optionElem = document.createElement('option')
        optionElem.innerHTML = item
        optionElem.value = String(index)
        monthsSelectElem.appendChild(optionElem)
      })

      monthsSelectElem.addEventListener('change', function () {
        date.setMonth(monthsSelectElem.value)
        createCells()
      })
    }

    monthsSelectElem.value = value
  }

  function setYear(value) {
    if (value === undefined) {
      value = date.getFullYear()
      yearInputElem.type = 'number'
      yearInputElem.min = 1970
      yearInputElem.max = 3000
      yearInputElem.addEventListener('change', function () {
        const currentVal = yearInputElem.value
        yearInputElem.value = Math.max(yearInputElem.min, Math.min(currentVal, yearInputElem.max))
        date.setFullYear(currentVal)
        createCells()
      })
    }

    yearInputElem.value = value
  }

  return {
    init () {
      createHeaders()
      setMonth()
      setYear()
      createCells()
    }
  }
}
