import React from 'react'
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Bar } from 'recharts';
import useGet from '../../hooks/useGet'

interface SalesItemType {
  id: number,
  name: string,
  orders: number
}

export default function StatisticsPage() {
  const [sales] = useGet<SalesItemType[]>('/sales', []);

  return (
    <div className='app-container'>
      <h1 className='text-center' >Sales report</h1>
      <ResponsiveContainer
        width="100%" aspect={16 / 9}
      >
        <BarChart
          data={sales}
        >
          <XAxis dataKey="name" />
          <YAxis width={50} />
          <Tooltip />
          <CartesianGrid vertical={false} />
          <Bar name='Total items sold' dataKey="items" fill='#3BD4AE' barSize={25} radius={[5, 5, 0, 0]} />
          <Bar name='Total orders' dataKey="orders" fill='#3BD4EE' barSize={25} radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
