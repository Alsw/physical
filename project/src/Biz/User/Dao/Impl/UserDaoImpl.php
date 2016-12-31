<?php

namespace Biz\User\Dao\Impl;

use Biz\User\Dao\UserDao;
use Codeages\Biz\Framework\Dao\GeneralDaoImpl;

class UserDaoImpl extends GeneralDaoImpl implements UserDao
{

    protected $table = 'users';

    public function declares()
    {
        return array(
            'timestamps' => array(),
            'serializes' => array(),
            'orderbys' => array(),
            'conditions' => array(
                'id = :id',
                'username = :username',
                'age = :age',
                'sex = :sex',
                'introduce = :introduce'
            ),
        );
    }

    public function findAll()
    {
        $sql = "SELECT * FROM {$this->table}";
        return $this->db()->fetchAll($sql);
    }
}
