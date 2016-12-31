<?php

namespace Biz\User\Service\Impl;

use Biz\User\Service\UserService;
use Codeages\Biz\Framework\Service\BaseService;

class UserServiceImpl extends BaseService implements UserService
{

    public function getUser($userID)
    {
        return $this->getUserDao()->get($userID);
    }

    public function findUsers()
    {
        return $this->getUserDao()->findAll();
    }

    public function addUser($params)
    {
        $params = array_splice($params, 1);
        return $this->getUserDao()->create($params);
    }

    public function modifyUser($params)
    {
        $userID = $params['id'];
        $params = array_splice($params, 1);
        return $this->getUserDao()->update($userID, $params);
    }

    public function delUser($userID)
    {
        return $this->getUserDao()->delete($userID);
    }

    protected function getUserDao()
    {
        return $this->biz->dao('User:UserDao');
    }
}
