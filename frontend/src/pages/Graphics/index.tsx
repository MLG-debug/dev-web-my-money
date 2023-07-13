import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { GraphicContainer, GraphicYearSelect, YearsSelect } from './styles'
import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
}

const labels = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export interface MonthlyExpenses {
  months: number[]
}

export const Graphics = () => {
  const currentYear = new Date().getFullYear()
  const startYear = 2010
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index,
  )

  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpenses>({
    months: [],
  })

  const data = {
    labels,
    datasets: [
      {
        label: 'Gasto durante o mês',
        data: monthlyExpenses,
        borderColor: '#2964FF',
        backgroundColor: '#2964FF50',
      },
    ],
  }

  const getMonthlyExpenses = async (year: number) => {
    const { data } = await api.get(`/transactions/year?year=${year}`)
    if (data) {
      setMonthlyExpenses(data)
    }
  }

  const handleYearChange = async (event: any) => {
    const selectedYear = event.target.value
    await getMonthlyExpenses(selectedYear)
  }

  useEffect(() => {
    getMonthlyExpenses(new Date().getFullYear())
  }, [])

  return (
    <GraphicContainer>
      <GraphicYearSelect>
        <h2>Gasto durante os meses</h2>
        <YearsSelect onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </YearsSelect>
      </GraphicYearSelect>
      <Line options={options} data={data} />
    </GraphicContainer>
  )
}
