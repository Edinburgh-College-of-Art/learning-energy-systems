<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Edit App School'), ['action' => 'edit', $appSchool->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete App School'), ['action' => 'delete', $appSchool->id], ['confirm' => __('Are you sure you want to delete # {0}?', $appSchool->id)]) ?> </li>
        <li><?= $this->Html->link(__('List App School'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New App School'), ['action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List App Questions'), ['controller' => 'AppQuestions', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New App Question'), ['controller' => 'AppQuestions', 'action' => 'add']) ?> </li>
        <li><?= $this->Html->link(__('List App Students'), ['controller' => 'AppStudents', 'action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New App Student'), ['controller' => 'AppStudents', 'action' => 'add']) ?> </li>
    </ul>
</div>
<div class="appSchool view large-10 medium-9 columns">
    <h2><?= h($appSchool->id) ?></h2>
    <div class="row">
        <div class="large-5 columns strings">
            <h6 class="subheader"><?= __('School Name') ?></h6>
            <p><?= h($appSchool->school_name) ?></p>
            <h6 class="subheader"><?= __('Password') ?></h6>
            <p><?= h($appSchool->password) ?></p>
        </div>
        <div class="large-2 columns numbers end">
            <h6 class="subheader"><?= __('Id') ?></h6>
            <p><?= $this->Number->format($appSchool->id) ?></p>
        </div>
    </div>
</div>
<div class="related">
    <div class="column large-12">
    <h4 class="subheader"><?= __('Related App Questions') ?></h4>
    <?php if (!empty($appSchool->app_questions)): ?>
    <table cellpadding="0" cellspacing="0">
        <tr>
            <th><?= __('Id') ?></th>
            <th><?= __('App School Id') ?></th>
            <th><?= __('Question') ?></th>
            <th><?= __('Answer') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
        <?php foreach ($appSchool->app_questions as $appQuestions): ?>
        <tr>
            <td><?= h($appQuestions->id) ?></td>
            <td><?= h($appQuestions->app_school_id) ?></td>
            <td><?= h($appQuestions->question) ?></td>
            <td><?= h($appQuestions->answer) ?></td>

            <td class="actions">
                <?= $this->Html->link(__('View'), ['controller' => 'AppQuestions', 'action' => 'view', $appQuestions->id]) ?>

                <?= $this->Html->link(__('Edit'), ['controller' => 'AppQuestions', 'action' => 'edit', $appQuestions->id]) ?>

                <?= $this->Form->postLink(__('Delete'), ['controller' => 'AppQuestions', 'action' => 'delete', $appQuestions->id], ['confirm' => __('Are you sure you want to delete # {0}?', $appQuestions->id)]) ?>

            </td>
        </tr>

        <?php endforeach; ?>
    </table>
    <?php endif; ?>
    </div>
</div>
<div class="related">
    <div class="column large-12">
    <h4 class="subheader"><?= __('Related App Students') ?></h4>
    <?php if (!empty($appSchool->app_students)): ?>
    <table cellpadding="0" cellspacing="0">
        <tr>
            <th><?= __('Id') ?></th>
            <th><?= __('Name') ?></th>
            <th><?= __('App School Id') ?></th>
            <th><?= __('Year') ?></th>
            <th><?= __('Unique Id') ?></th>
            <th class="actions"><?= __('Actions') ?></th>
        </tr>
        <?php foreach ($appSchool->app_students as $appStudents): ?>
        <tr>
            <td><?= h($appStudents->id) ?></td>
            <td><?= h($appStudents->name) ?></td>
            <td><?= h($appStudents->app_school_id) ?></td>
            <td><?= h($appStudents->year) ?></td>
            <td><?= h($appStudents->unique_id) ?></td>

            <td class="actions">
                <?= $this->Html->link(__('View'), ['controller' => 'AppStudents', 'action' => 'view', $appStudents->id]) ?>

                <?= $this->Html->link(__('Edit'), ['controller' => 'AppStudents', 'action' => 'edit', $appStudents->id]) ?>

                <?= $this->Form->postLink(__('Delete'), ['controller' => 'AppStudents', 'action' => 'delete', $appStudents->id], ['confirm' => __('Are you sure you want to delete # {0}?', $appStudents->id)]) ?>

            </td>
        </tr>

        <?php endforeach; ?>
    </table>
    <?php endif; ?>
    </div>
</div>
