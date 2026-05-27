<?php

return [
    'default'         => 'mysql',

    'time_query_rule' => [],

    'auto_timestamp'  => true,

    'datetime_format' => 'Y-m-d H:i:s',

    'datetime_field'  => '',

    'connections'     => [
        'mysql' => [
            'type'            => 'mysql',
            'hostname'        => '116.204.132.158',
            'database'        => 'chongai',
            'username'        => 'chongai',
            'password'        => 'sRCMhycJ7KcsGKTd',
            'hostport'        => '3306',
            'params'          => [],
            'charset'         => 'utf8mb4',
            'prefix'          => '',
            'deploy'          => 0,
            'rw_separate'     => false,
            'master_num'      => 1,
            'slave_no'        => '',
            'fields_strict'   => true,
            'break_reconnect' => false,
            'trigger_sql'     => true,
            'fields_cache'    => false,
        ],
    ],
];