<?php

namespace Api\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Mutation;
use App\Model\User;

class NewUserMutation extends Mutation
{
    protected $attributes = [
        'name' => 'NewUser'
    ];

    public function type()
    {
        return GraphQL::type('users');
    }

    public function args()
    {
        return [
            'name' => [
                'name' => 'name',
                'type' => Type::nonNull(Type::string())
            ],
            'email' => [
                'name' => 'email',
                'type' => Type::nonNull(Type::string())
            ],
            'password' => [
                'name' => 'password',
                'type' => Type::nonNull(Type::string())
            ],
            'first_name' => [
                'name' => 'first_name',
                'type' => Type::nonNull(Type::string())
            ],
            'last_name' => [
                'name' => 'last_name',
                'type' => Type::string()
            ],
            'avatar' => [
                'name' => 'avatar',
                'type' => Type::string()
            ]
        ];
    }

    public function resolve($root, $args)
    {
        $args['password'] = $args['password'];
        $user = User::create($args);
        if (!$user) {
            return null;
        }
        $user->profile()->create($args);
        return $user;
    }
}
