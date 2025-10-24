/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */

import CartButton from '@/components/CartButton';
import { cn } from '@/utils/cn';
import { images, offers } from 'constant';
import { Fragment } from 'react';
import { Button, FlatList, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Sentry from '@sentry/react-native';
import useAuthStore from '@/store/auth.store';

export default function IndexScreen() {
  const { user } = useAuthStore();
  console.log(JSON.stringify(user, null, 2));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <View key={index}>
              <Pressable
                className={cn('offer-card ', isEven ? 'flex-row-reverse ' : 'flex-row')}
                style={{ backgroundColor: item.color }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className={'h-full w-1/2'}>
                      <Image source={item.image} className={'size-full'} resizeMode="cover" />
                    </View>
                    <View className={cn('offer-card_info flex-1', isEven ? 'pl-10' : 'pr-10')}>
                      <Text className="h1-bold text-[1.4rem] text-white leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        className="size-10"
                        resizeMode="contain"
                        tintColor={'#ffffff'}
                        source={images.arrowRight}
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        ListHeaderComponent={() => (
          <View className="flex-between flex-row w-full my-5 px-5">
            <View className="flex-start">
              <Text className="small-bold text-primary">DELIVER TO</Text>
              <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                <Text className="paragraph-bold text-dark-100">Depok</Text>
                <Image source={images.arrowDown} className="size-3 " resizeMode="contain" />
              </TouchableOpacity>
            </View>
            <CartButton />
          </View>
        )}
        contentContainerClassName="pb-28 px-5"
      />
    </SafeAreaView>
  );
}
