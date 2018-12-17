'''
 有一张商品购买记录表T，其中包含字段uid（用户id），pid（商品id），
 现在要统计即购买了商品A（即pid为A）又购买了商品B（即pid为B）的用户uid
 请写出对应的SQL
'''
select t1.uid from(select uid from T where T.pid = A) as t1 
join 
(select uid from T where T.pid = B)as t2
on t1.uid = t2.uid

#  分别找出购买商品A的用户，购买商品B的用户，并设定两个用户为同一人
#  select uid from T where T.pid = A
#  select uid fron T where T.pid = B
#  select t1.uid from t1 join t2 on t1.uid = t2.uid