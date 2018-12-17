/* MongoDB 是分布式，NoSQL数据库，由C++编写，运行稳定，性能高
旨在为WEB应用，提供可扩展，高性能数据存储   */

/*
MongoDB 特点：

1、模式自由 :可以把不同结构的文档存储在同一个数据库里
2、面向集合的存储：适合存储 JSON风格文件的形式
3、完整的索引支持：对任何属性可索引
4、复制和高可用性：支持服务器之间的数据复制，支持主-从模式及服务器之间的相互复制
   复制的主要目的是提供冗余及自动故障转移
5、自动分片：支持云级别的伸缩性：自动分片功能支持水平的数据库集群，
   可动态添加额外的机器
6、丰富的查询：支持丰富的查询表达方式，
   查询指令使用JSON形式的标记，可轻易查询文档中的内嵌的对象及数组
7、快速更新：查询优化器会分析查询表达式，并生成一个高效的查询计划
   高效的传统存储方式：支持二进制数据及大型对象

数据类型：
    objectID string  integer Double array data  null boolean
    binaryDate Regular expression

   参考：https://www.imooc.com/article/43524
*/


// MongoDB 数据库的CURD

db.stu.insert({name:'aa', gender:'0'})
db.stu.update({name:'aa'},{name:'bb'})
db.stu.update({name:'aa'},{$set:{name:'888'}})
db.stu.update({}, {$set:{gender:0}, {multi:true}})

db.stu.save({_id:'8888','name':'li',gender:0})
db.stu.remove({gender:0},{justOne:true}) 
db.stu.remove({})

// 数据查询
db.stu.find({name:'zhangsan'})
db.stu.find({age:{$ge:18}})
db.stu.find({age:{$ge:18}, gender:true})
db.stu.find({$or:[{age:{$ge:18}}, {gender:true}], name:'zhangsan'})

db.stu.find({age:{$in:[18-28]}})
db.stu.find({name:/^黄/})
db.stu.find({name:{$regex:'^黄'}})

db.stu.find({age:{$ge:30}})
//  js 函数
db.stu.find({$where:function(){return this.age>30;}})


//  limit & skip
db.stu.find().limit(2)
db.stu.find().skip(2) // 从第三条开始查询

for(i=0;i<15;i++){db.t1.insert({_id:i})}
db.stu.find().limit(4).skip(5) // 查询第5-8条数据
db.stu.find().skip(5).limit(4) 

// MonoDB 投影
db.stu.find({},{_id:0,name:1,gender:1})

// MongoDB 排序
db.stu.find().sort({gender:-1, age:17})

db.stu.find({gender:1}).count()
db.stu.count({age:{$le:30}, gender:1})
// 去重
db.stu.distinct('hometown',{age:{$gte:19}})
// 聚合
// ps ajx | grep mongo
db.stu.aggregate([$sum:{age:18}])

// unwind 拆分
db.t2.insert({_id:1,item:'t-shirt',size:['S','L','M']})
db.t2.aggregate([{$unwind:'$size'}])
// 处理空数组、非数组、无字段、null情况
db.inventory.aggregate([{
    $unwind:{
        path:'$字段名称',
        preserveNullandEmptyArrays:true
    }
}])
db.t3.insert([
    {'_id':1, 'item':'a', 'size':['S','L','M']},
    {'_id':2, 'item':'b', 'size':[]},
    {'_id':3, 'item':'c', 'size':['M']},
    {'_id':3, 'item':'d'},
    {'_id':3, 'item':'e', 'size': null}
])
db.t3.aggregate([{$unwind:'$size'}])
db.t3.aggregate([{$unwind:{path:'$size',preserveNullandEmptyArrays:true}}])


// 索引
for(i=0;i<100000;i++){
    db.stu.insert({name:'test'+i, age:i})
}
// explain()查询性能分析
db.stu.find({name:'test10000'}).explain('executionStats') // 执行状态
// 建立索引
db.stu.ensureIndex({name:1})
db.stu.find({name:'test100000'}).explain('executionStats')
db.stu.getIndexes()
db.stu.dropIndex('name')

/* 
备份与恢复
mongodump -h dbhost -d dbname -o dbdirectory
 -h 服务器名称，可以指定端口
 -d 数据库名称
 -o 备份数据存放位置

sudo mkdir test1bak

mongodump -h 192.168.111.21:27017 -d test1 -o ~/Desktop/mongoDB
mongorestore -h 192.168.111.21:27017 -d test2 --dir ~/Desktop/mongoDB

迁移
mongoexport
mongoimport

*/