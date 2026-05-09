import CategoryList from '@/components/CategoryList'
import CreateRecipe from '@/components/CreateRecipe'
import IntroHeader from '@/components/IntroHeader'
import colors from '@/services/colors'
import React from 'react'
import { ScrollView } from 'react-native'

export default function home() {
  return (
    <ScrollView style={{
      height: "100%",
      backgroundColor: colors.WHITE,
      padding: 20,
    }}>
     {/* intro text */}
     <IntroHeader />

     {/* Recipe generator UI*/}
    <CreateRecipe />
     {/* Categorys */}
     <CategoryList />
    </ScrollView>
  )
}